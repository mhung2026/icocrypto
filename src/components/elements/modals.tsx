/**
 * Modals component
 * 
 * A customizable modal dialog that can be positioned and sized according to the props provided. 
 * It supports a close button and can handle click events outside the modal to close it.
 * 
 * @component
 * @example
 * <Modals open={true} size="xl" position="center" onClose={() => console.log('Modal closed')}>
 *   <h3>Header</h3>
 *   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
 * </Modals>
 * 
 * @param {Object} props - The properties for the Modals component.
 * @param {('sm' | 'lg' | 'xl')} [props.size='xl'] - The size of the modal. Options are 'sm', 'lg', 'xl'.
 * @param {('top' | 'center' | 'bottom')} [props.position='center'] - The position of the modal. Options are 'top', 'center', 'bottom'.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {boolean} props.open - Determines if the modal is open or closed.
 * @param {() => void} [props.onClose] - Optional callback function to be called when the modal is closed.
 * 
 * @author thinhphoenix
 */


'use client';
import React, { ReactNode, useCallback } from "react";

interface ModalsProps {
  size?: 'sm' | 'lg' | 'xl';
  position?: 'top' | 'center' | 'bottom';
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

export default function Modals({ 
  size = 'xl', 
  position = 'center', 
  children, 
  open, 
  onClose 
}: ModalsProps) {
  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  if (!open) return null;

  const modalSizeClass = size === 'xl' ? 'modal-xl' : size === 'lg' ? 'modal-lg' : '';
  const modalPositionClass = position === 'center' ? 'modal-dialog-centered' : 
                             position === 'bottom' ? 'modal-dialog-bottom' : '';

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 50 }}
        onClick={handleOverlayClick}
      />
      <div
        className="modal fade show"
        style={{
          display: "block",
          paddingLeft: "0px",
          zIndex: 1050,
        }}
        aria-modal="true"
        role="dialog"
      >
        <div className={`modal-dialog ${modalSizeClass} ${modalPositionClass}`}>
          <div className="modal-content">
            <a
              href="#"
              className="modal-close"
              aria-label="Close"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              <em className="ti ti-close" />
            </a>
            <div className="modal-body p-md-4 p-lg-5 mfp-s-ready mfp-iframe-holder">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}