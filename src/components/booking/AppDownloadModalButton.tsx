"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ReactDOM from "react-dom";
import { appStoreUrl, googlePlayUrl } from "@/lib/site-data";

type AppDownloadModalButtonProps = {
  children?: ReactNode;
  className?: string;
  modalTitle?: string;
  modalDescription?: string;
};

type AppDownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  modalDescription: string;
};

const joinClasses = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

const StoreIcon = ({ type }: { type: "apple" | "play" }) => {
  if (type === "apple") {
    return (
      <svg aria-hidden="true" viewBox="-1 -2 26 28" className="h-5 w-5 sm:h-7 sm:w-7">
        <path
          fill="currentColor"
          d="M16.2 1.9c.1 1.1-.3 2.2-1 3-1 1.1-2.3 1.8-3.5 1.7-.1-1.1.4-2.2 1.1-3 1-1.1 2.4-1.8 3.4-1.7Zm3.7 16.8c-.6 1-1 1.5-1.8 2.4-1.1 1.2-2.6 2.7-4.5 2.7-1.7 0-2.1-.9-4.4-.9s-2.8.9-4.4 1c-1.8.1-3.1-1.3-4.2-2.5-2.3-2.5-4-7.2-1.7-10.4 1.1-1.6 3.1-2.6 5.3-2.6 1.7 0 3.2 1 4.3 1s2.9-1.2 4.9-1c.8 0 3.2.3 4.7 2.5-.1.1-2.8 1.6-2.8 4.9.1 3.9 3.5 5.2 3.6 5.2-.1.2-.4 1.1-1 2Z"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 sm:h-7 sm:w-7">
      <path fill="#34A853" d="M3.6 2.4 14.7 12 3.6 21.6V2.4Z" />
      <path fill="#FBBC04" d="m14.7 12 3.1-2.7 3.7 2.1c.7.4.7 1.5 0 1.9l-3.7 2.1-3.1-3.4Z" />
      <path fill="#4285F4" d="m3.6 2.4 14.2 6.9-3.1 2.7L3.6 2.4Z" />
      <path fill="#EA4335" d="m3.6 21.6 11.1-9.6 3.1 3.4-14.2 6.2Z" />
    </svg>
  );
};

export const AppDownloadModal = ({
  isOpen,
  onClose,
  modalTitle,
  modalDescription,
}: AppDownloadModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Close app download options"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white text-xl leading-none text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-950"
        >
          x
        </button>
        <div className="flex flex-col items-center text-center">
          <h2
            id={titleId}
            className="max-w-lg font-[--font-playfair] text-4xl capitalize leading-tight text-neutral-950 sm:text-5xl"
          >
            {modalTitle}
          </h2>
          <p className="mt-5 max-w-md leading-7 text-neutral-600">
            {modalDescription}
          </p>
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-black px-3 text-left text-white transition hover:bg-neutral-800 sm:min-h-16 sm:gap-3 sm:px-5"
            >
              <StoreIcon type="apple" />
              <span>
                <span className="block text-[9px] leading-3 sm:text-[10px]">
                  Download on the
                </span>
                <span className="block text-sm font-semibold leading-5 sm:text-lg">
                  App Store
                </span>
              </span>
            </a>
            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-black px-3 text-left text-white transition hover:bg-neutral-800 sm:min-h-16 sm:gap-3 sm:px-5"
            >
              <StoreIcon type="play" />
              <span>
                <span className="block text-[9px] leading-3 sm:text-[10px]">
                  Get it on
                </span>
                <span className="block text-sm font-semibold leading-5 sm:text-lg">
                  Google Play
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const AppDownloadModalButton = ({
  children = "Book Now",
  className,
  modalTitle = "book now on the le meow app",
  modalDescription = "Download the app to choose your treatment, confirm your booking, and manage your Meow Aesthetics appointment.",
}: AppDownloadModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modal = isOpen
    ? ReactDOM.createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (
              modalRef.current &&
              !modalRef.current.contains(event.target as Node)
            ) {
              setIsOpen(false);
            }
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              aria-label="Close app download options"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white text-xl leading-none text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-950"
            >
              x
            </button>
            <div className="flex flex-col items-center text-center p-4">
              <h2
                id={titleId}
                className="font-[--font-playfair] text-4xl capitalize leading-tight text-neutral-950 sm:text-5xl"
              >
                {modalTitle}
              </h2>
              <p className="mt-5  leading-7 text-neutral-600">
                {modalDescription}
              </p>
              <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-black px-3 text-left text-white transition hover:bg-neutral-800 sm:min-h-16 sm:gap-3 sm:px-5"
                >
                  <StoreIcon type="apple" />
                  <span>
                    <span className="block text-[9px] leading-3 sm:text-[10px]">
                      Download on the
                    </span>
                    <span className="block text-sm font-semibold leading-5 sm:text-lg">
                      App Store
                    </span>
                  </span>
                </a>
                <a
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full max-w-[220px] items-center justify-center gap-2 rounded-full bg-black px-3 text-left text-white transition hover:bg-neutral-800 sm:min-h-16 sm:gap-3 sm:px-5"
                >
                  <StoreIcon type="play" />
                  <span>
                    <span className="block text-[9px] leading-3 sm:text-[10px]">
                      Get it on
                    </span>
                    <span className="block text-sm font-semibold leading-5 sm:text-lg">
                      Google Play
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={joinClasses("cursor-pointer", className)}
      >
        {children}
      </button>
      {modal}
    </>
  );
};

export default AppDownloadModalButton;
