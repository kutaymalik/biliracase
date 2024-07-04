import { render, screen } from '@testing-library/react';
import AssetTable from '../components/AssetTable';

test('renders table headers', () => {
  render(<AssetTable />);
  expect(screen.getByText(/Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Price/i)).toBeInTheDocument();
  expect(screen.getByText(/Market Value/i)).toBeInTheDocument();
  expect(screen.getByText(/24h Change/i)).toBeInTheDocument();
  expect(screen.getByText(/24h Sparkline/i)).toBeInTheDocument();
});
