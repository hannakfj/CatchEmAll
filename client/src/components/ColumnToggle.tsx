import React from "react";
import { Box, Button, Stack, Divider, } from "@chakra-ui/react";
import { ColumnConfig } from "../types/pokemon";

interface ColumnToggleProps {
  columnsConfig: ColumnConfig;
  setColumnsConfig: React.Dispatch<React.SetStateAction<ColumnConfig>>;
}

const ColumnToggle: React.FC<ColumnToggleProps> = ({ columnsConfig, setColumnsConfig }) => {
  const columns = [
    { label: 'Picture', key: 'picture' as keyof ColumnConfig },
    { label: 'Weight', key: 'weight' as keyof ColumnConfig },
    { label: 'Height', key: 'height' as keyof ColumnConfig },
    { label: 'Types', key: 'types' as keyof ColumnConfig },
  ];

  // const bluecolor = "blue.800";
  // Define colors for active and inactive states
  const activeBg = "blue.800";   
  const inactiveBg = "gray.200";  
  const activeTextColor = "white";  
  const inactiveTextColor = "black"; 

  // Handle button click to toggle the visibility of columns
  const handleButtonClick = (key: keyof ColumnConfig) => {
    //Update the state of the column based on the previous state (toggle)
    setColumnsConfig((prev) => ({ 
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Box mb={4} p={4} borderRadius="md" maxWidth="600px" mx="auto"> 
      <Divider mb={4} />
      <Stack direction="row" spacing={6} justify="center">
        {columns.map((column) => (
          <Button
            key={column.key}
            onClick={() => handleButtonClick(column.key)}  // Toggle column on click
            bg={columnsConfig[column.key] ? activeBg : inactiveBg}  // Background color
            color={columnsConfig[column.key] ? activeTextColor : inactiveTextColor}  // Text color
            _hover={{ bg: columnsConfig[column.key] ? "blue.600" : "gray.300" }}  // Hover state
            variant={columnsConfig[column.key] ? 'solid' : 'outline'}  // Solid if active, outline if not
          >
            {column.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default ColumnToggle;
