import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ColumnToggle from './ColumnToggle';
import { ChakraProvider } from '@chakra-ui/react';
import { ColumnConfig } from '../types/pokemon';

// Mocking the column config type for testing purposes
const defaultColumnsConfig: ColumnConfig = {
  picture: true,
  weight: true,
  height: true,
  types: true,
};



describe('ColumnToggle Component', () => {
  const renderColumnToggle = (columnsConfig = defaultColumnsConfig) => {
    const setColumnsConfig = jest.fn(); // Mock function to handle state updates

    render(
      <ChakraProvider> {/* Wrap the component with ChakraProvider */}
        <ColumnToggle columnsConfig={columnsConfig} setColumnsConfig={setColumnsConfig} />
      </ChakraProvider>
    );

    return { setColumnsConfig };
  };

  // Test that clicking a button toggles the column config correctly
  it('toggles the columns when buttons are clicked', () => {
    const { setColumnsConfig } = renderColumnToggle();

    const pictureButton = screen.getByText('Picture');
    const weightButton = screen.getByText('Weight');
    const heightButton = screen.getByText('Height');
    const typesButton = screen.getByText('Types');

    // Simulate clicking on the Picture button
    fireEvent.click(pictureButton);

    // Check if the `setColumnsConfig` function has been called
    expect(setColumnsConfig).toHaveBeenCalledWith(expect.any(Function));

    // Get the callback function passed to `setColumnsConfig`
    const updateCallback = setColumnsConfig.mock.calls[0][0];
    const newState = updateCallback(defaultColumnsConfig); // Simulate the state update

    // Now check if the `picture` key has been toggled from true to false
    expect(newState).toEqual({
      picture: false,
      weight: true,
      height: true,
      types: true,
    });

    // Simulate clicking the Weight button
    fireEvent.click(weightButton);
    const weightCallback = setColumnsConfig.mock.calls[1][0];
    const newStateAfterWeightClick = weightCallback(newState);

    // Check if the `weight` key has been toggled from true to false
    expect(newStateAfterWeightClick).toEqual({
      picture: false,
      weight: false,
      height: true,
      types: true,
    });

    // Simulate clicking the Height button
    fireEvent.click(heightButton);
    const heightCallback = setColumnsConfig.mock.calls[2][0];
    const newStateAfterHeightClick = heightCallback(newStateAfterWeightClick);

    expect(newStateAfterHeightClick).toEqual({
      picture: false,
      weight: false,
      height: false,
      types: true,
    });

    // Simulate clicking the Types button
    fireEvent.click(typesButton);
    const typesCallback = setColumnsConfig.mock.calls[3][0];
    const newStateAfterTypesClick = typesCallback(newStateAfterHeightClick);

    expect(newStateAfterTypesClick).toEqual({
      picture: false,
      weight: false,
      height: false,
      types: false,
    });
  });
});
