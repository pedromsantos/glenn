import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('Header should', () => {
  test('display header text', () => {
    render(<App />);

    expect(screen.getByText('Glenn')).toBeTruthy();
  });

  test('display content title text', () => {
    render(<App />);

    expect(screen.getByText('Welcome to Glenn')).toBeTruthy();
  });

  test('display footer copyrigth text', () => {
    render(<App />);

    expect(screen.getByText('CoKaiDō 2022')).toBeTruthy();
  });
});
