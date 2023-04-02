import { render, screen } from '@testing-library/react';
import MyApp from './App';

describe('App renders expectedly', () => {
  it('App renders correctly', () => {
    render(<MyApp />);
    const appContainer = screen.getByTestId('my-app');
    expect(appContainer).toBeInTheDocument();
    const appHeader = screen.getByTestId('app-header');
    expect(appHeader).toBeInTheDocument();
  });

  it('App render matches snapshot', () => {
    const { asFragment } = render(<MyApp />);
    expect(asFragment()).toMatchSnapshot();
  });
});
