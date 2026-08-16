import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TasksNavbar } from '../components/navbar/TasksNavbar';
import { useTasks } from '../hooks/useTasks';
import { useTaskStore } from '../store/useTaskStore';

vi.mock('../hooks/useTasks');

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('TasksNavbar Component', () => {
  beforeEach(() => {
    useTaskStore.setState({ selectedTaskId: null, flyToLocationCoordinate: null });
    vi.clearAllMocks();
  });

  it('should render loading state when isLoading is true', () => {
    vi.mocked(useTasks).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    renderWithClient(<TasksNavbar />);

    expect(screen.getByTestId('loading-message')).toBeInTheDocument();
  });

  it('should render tasks and trigger selectTaskAndFlyTo on click', async () => {
    const mockGeoJson = {
      features: [
        {
          properties: {
            id: '1',
            title: 'בדיקת ציוד',
            description: 'תיאור בדיקה',
            status: 'OPEN',
          },
          geometry: { coordinates: [34.7818, 32.0853] },
        },
      ],
    };

    vi.mocked(useTasks).mockReturnValue({
      data: mockGeoJson,
      isLoading: false,
      isError: false,
    } as any);

    renderWithClient(<TasksNavbar />);

    expect(screen.getByText('בדיקת ציוד')).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByText('בדיקת ציוד'));

    expect(useTaskStore.getState().selectedTaskId).toBe('1');
    expect(useTaskStore.getState().flyToLocationCoordinate).toEqual([34.7818, 32.0853]);
  });
});