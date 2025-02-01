import React from 'react';
import { Fab, Box } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

type FloatingSettingsButtonProps = {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    TRLMode: boolean
};

const FloatingSettingsButton: React.FC<FloatingSettingsButtonProps> = ({ onClick, TRLMode }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 200,
                right: TRLMode ? 'auto' : 30,  // Ajuste dinámico de 'right'
                left: TRLMode ? 10 : 'auto',    // Ajuste dinámico de 'left'
                zIndex: 1100,
            }}
        >
            <Fab
                color="primary"
                aria-label="settings"
                onClick={onClick}
                sx={{
                    width: 50,
                    height: 50,
                    borderRadius: TRLMode ? '50% 50% 50% 0' : '50% 50% 0 50%',
                    boxShadow: '0px 4px 10px rgb(79 203 225)', // Reflejo en la parte inferior
                }}
            >
                <SettingsOutlinedIcon
                    sx={{
                        animation: 'rotateIcon 2s linear infinite', // Aplicando animación solo al ícono
                        '@keyframes rotateIcon': {
                            '0%': {
                                transform: 'rotate(0deg)',
                            },
                            '100%': {
                                transform: 'rotate(360deg)',
                            },
                        },
                    }}
                />
            </Fab>
        </Box>
    );
};

export default FloatingSettingsButton;
