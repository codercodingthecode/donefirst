import React from 'react';
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogProps } from '@mui/material';
import { Grid, IconButton, Typography } from '@mui/material';
import MuiDialogTitle from '@mui/material/DialogTitle';
import { Close } from '@mui/icons-material';

export interface DialogCompRenderContext {
    onClose?: () => void;
}

interface DialogCompProps extends DialogProps {
    open: boolean;
    onClose?: () => void;
    title?: string;
    header?: string;
    renderContent: () => JSX.Element;
    renderActions?: (ctx: DialogCompRenderContext) => JSX.Element;
}

export const Dialog: React.FC<DialogCompProps> = ({
    header,
    open,
    onClose,
    title,
    renderContent,
    renderActions,
    ...props
}) => {
    return (
        <MuiDialog open={open} {...props}>
            <DialogHeader title={title} onClose={onClose} />
            <DialogContent>
                {header && <DialogContentText>{header}</DialogContentText>}
                {renderContent()}
            </DialogContent>
            {renderActions && <DialogActions>{renderActions({ onClose })}</DialogActions>}
        </MuiDialog>
    );
};

export interface DialogHeaderProps {
    title?: string;
    onClose?: () => void;
    children?: React.ReactNode;
}

const DialogHeader: React.FC<DialogHeaderProps> = (props) => {
    const { children, title, onClose, ...other } = props;
    return (
        <MuiDialogTitle {...other}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs>
                    <Typography
                        variant="h4"
                        style={{
                            fontWeight: 400,
                            fontSize: '24px',
                            lineHeight: '28px',
                            overflowWrap: 'break-word',
                        }}
                    >
                        {title}
                    </Typography>
                </Grid>
                {onClose ? (
                    <Grid item style={{ marginRight: -12, alignSelf: 'baseline' }}>
                        <IconButton aria-label="close" onClick={onClose} size="large">
                            <Close />
                        </IconButton>
                    </Grid>
                ) : null}
            </Grid>
        </MuiDialogTitle>
    );
};
