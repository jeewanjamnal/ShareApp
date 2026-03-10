import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Home} from 'screens';
import { useStore } from '../src/store/useStore';
import useViewModel from 'screens/Home/Home.viewmodel';
import {useNavigation} from '@react-navigation/native';
import {AUTH_STACK_NAVIGATOR} from 'navigators/routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from 'contexts/ThemeContext';

jest.mock('../src/store/useStore', () => ({
  useStore: jest.fn(),
}));

jest.mock('screens/Home/Home.viewmodel', () => jest.fn());

jest.mock('contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('Home Screen', () => {
  let mockNavigation: jest.Mocked<NativeStackNavigationProp<any>>;
  let mockToggleSwitch: jest.Mock;
  let mockGetMoviesData: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetMoviesData = jest.fn();

    // Mock navigation
    mockNavigation = {navigate: jest.fn()} as any;
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);

    // Mock ViewModel
    mockToggleSwitch = jest.fn();
    (useViewModel as jest.Mock).mockReturnValue({
      styles: {
        container: {},
        safeView: {},
        listMain: {},
        listView: {},
        image: {},
        subText: {},
        dashboardFlatListSeparator: {},
      },
      t: (key: string) => key, // Mock translation function
      isEnabled: false,
      toggleSwitch: mockToggleSwitch,
    });

    // Mock Theme
    (useTheme as jest.Mock).mockReturnValue({
      themeColors: {
        primary: {10: 'lightblue', 50: 'gray', 90: 'blue'},
        secondary: 'white',
      },
    });

    // Mock Zustand Store
    (useStore as unknown as jest.Mock).mockReturnValue({
      movieData: [
        {
          id: 1,
          name: 'Movie 1',
          publisher: 'Marvel',
          firstappearance: '2022',
          imageurl: 'https://example.com/movie1.jpg',
        },
      ],
      getMoviesData: mockGetMoviesData,
    });
  });

  test('renders Home screen correctly', () => {
    const {getByText} = render(<Home />);
    expect(getByText('dashboard.list.title')).toBeTruthy();
  });

  test('calls getMoviesData on mount', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(mockGetMoviesData).toHaveBeenCalled();
    });
  });

  test('displays movies in FlatList', () => {
    const {getByText} = render(<Home />);
    expect(getByText('Movie 1')).toBeTruthy();
    expect(getByText('Marvel')).toBeTruthy();
    expect(getByText('2022')).toBeTruthy();
  });

  test('navigates to details when movie is pressed', () => {
    const {getByText} = render(<Home />);
    fireEvent.press(getByText('Movie 1'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith(AUTH_STACK_NAVIGATOR.HOME_DETAILS, {
      data: {
        id: 1,
        name: 'Movie 1',
        publisher: 'Marvel',
        firstappearance: '2022',
        imageurl: 'https://example.com/movie1.jpg',
      },
    });
  });

  test('toggles switch correctly', () => {
    const {getByRole} = render(<Home />);
    const switchComponent = getByRole('switch');
    fireEvent(switchComponent, 'valueChange', true);
    expect(mockToggleSwitch).toHaveBeenCalledWith(true);
  });
});
