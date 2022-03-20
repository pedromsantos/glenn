import { render, screen, waitFor } from '@testing-library/react';
import Chords from '../../components/Chords';

describe('Header should', () => {
  test('display pitch card title', () => {
    render(<Chords />);

    expect(screen.getByText('Pitch')).toBeTruthy();
  });
  test('display chord type card title', () => {
    render(<Chords />);

    expect(screen.getByText('Chord type')).toBeTruthy();
  });

  test('display position card title', () => {
    render(<Chords />);

    expect(screen.getByText('CAGED Positions')).toBeTruthy();
  });
});
