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

  test.each(Array.from({ length: 16 }, (_, i) => i + 1))('Select pitch when clicked', (index) => {
    render(<PitchSelector onPicthSelected={() => {}} />);

    fireEvent.click(screen.getByTestId('ListItemButton' + index));

    expect(screen.getByTestId('ListItemButton0')).not.toHaveClass(selectedClassIdentifier);
    expect(screen.getByTestId('ListItemButton' + index)).toHaveClass(selectedClassIdentifier);
  });

  test.each([...Array(16).keys()])('Notify when pitch is selected', (index) => {
    const selectedMock = jest.fn();

    render(<PitchSelector onPicthSelected={selectedMock} />);

    fireEvent.click(screen.getByTestId('ListItemButton' + index));

    expect(selectedMock).toHaveBeenCalledWith(Pitch.pitches[index]);
  });
});
