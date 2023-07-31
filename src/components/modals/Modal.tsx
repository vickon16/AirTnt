"use client";

import React, { FC, useCallback} from "react";
import Button from "../ui/Button";
import { Modal as MantineModal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface ModalProps {
  actionLabel: string;
  onClose: () => void;
  action: () => void;
  isOpen: boolean;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  size? : string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  actionLabel,
  onClose,
  action,
  title,
  body,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
  size
}) => {
  const [, { close }] = useDisclosure(false);

  const handleClose = useCallback(() => {
    if (disabled) return;
    close();
    onClose();
    // setTimeout(() => onClose(), 300);
  }, [disabled, onClose, close]);

  const handleAction = useCallback(() => {
    if (disabled) return;
    action();
  }, [disabled, action]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);


  return (
    <>
      {/* Overlay */}
      <MantineModal
        opened={isOpen}
        onClose={handleClose}
        centered
        className="flex justify-center items-center z-50 w-full [&_h2.mantine-Modal-title]:text-lg [&_h2.mantine-Modal-title]:font-bold"
        title={title}
        size={size || "md"}
        withCloseButton
        transitionProps={{ transition: 'rotate-left', duration: 300 }}
      >
 
        <div className="h-full flex flex-col w-full">
          {/* Header */}

          {/* Body */}
          <div className="relative px-3 py-6 sm:p-6 flex-auto">{body}</div>

          {/* Footer */}
          <div className="flex flex-col gap-2 p-6">
            <div className="flex items-center gap-4 w-full">
              {secondaryAction && secondaryActionLabel && (
                <Button
                  variant="outline"
                  onClick={handleSecondaryAction}
                >
                  {secondaryActionLabel}
                </Button>
              )}
              <Button isLoading={disabled} onClick={handleAction}>
                {actionLabel}
              </Button>
            </div>
            {footer}
          </div>
        </div>
      </MantineModal>
    </>
  );
};

export default Modal;
