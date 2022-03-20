import { fireEvent, render, screen } from '@testing-library/react';
import PitchSelector from '../../components/PitchSelector';
import Pitch from '../../Domain/Pitch';
import '@testing-library/jest-dom';

const selectedClassIdentifier = 'Mui-selected';

describe('Pitch selector should', () => {
  test('display all pitches', () => {
    const pitches = Pitch.pitches.map((p) => p.Name);
    render(<PitchSelector onPicthSelected={() => {}} />);

    for (const pitch of pitches) {
      expect(screen.getByText(pitch)).toBeTruthy();
    }
  });

  test('Select pitch C by default', () => {
    render(<PitchSelector onPicthSelected={() => {}} />);

    expect(screen.getByTestId('ListItemButton0')).toHaveClass(selectedClassIdentifier);
  });

  test('Select pitch C when clicked', () => {
    render(<PitchSelector onPicthSelected={() => {}} />);

    fireEvent.click(screen.getByTestId('ListItemButton10'));
    fireEvent.click(screen.getByTestId('ListItemButton0'));

    expect(screen.getByTestId('ListItemButton10')).not.toHaveClass(selectedClassIdentifier);
    expect(screen.getByTestId('ListItemButton0')).toHaveClass(selectedClassIdentifier);
  });

  test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])(
    'Select pitch when clicked',
    (index) => {
      render(<PitchSelector onPicthSelected={() => {}} />);

      fireEvent.click(screen.getByTestId('ListItemButton' + index));

      expect(screen.getByTestId('ListItemButton0')).not.toHaveClass(selectedClassIdentifier);
      expect(screen.getByTestId('ListItemButton' + index)).toHaveClass(selectedClassIdentifier);
    }
  );

  test.each([
    [0, Pitch.C],
    [1, Pitch.CSharp],
    [2, Pitch.DFlat],
    [3, Pitch.D],
    [4, Pitch.DSharp],
    [5, Pitch.EFlat],
    [6, Pitch.E],
    [7, Pitch.F],
    [8, Pitch.FSharp],
    [9, Pitch.GFlat],
    [10, Pitch.G],
    [11, Pitch.GSharp],
    [12, Pitch.AFlat],
    [13, Pitch.A],
    [14, Pitch.ASharp],
    [15, Pitch.BFlat],
    [16, Pitch.B],
  ])('Notify when pitch is selected', (index, pitch) => {
    const selectedMock = jest.fn();

    render(<PitchSelector onPicthSelected={selectedMock} />);

    fireEvent.click(screen.getByTestId('ListItemButton' + index));

    expect(selectedMock).toHaveBeenCalledWith(pitch);
  });
});
