/**
 * AVAILABLE ICONS
 * MenuIcon
 * XIcon
 * HomeIcon
 * GradeIcon
 * SettingsIcon
 * UserIcon
 * PlusIcon
 * TrashIcon
 * CheckCircleIcon
 * ClockIcon
 * SectionIcon
 */

import { School } from "lucide-react";

export const MenuIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={positionStyles}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
};

export const XIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={positionStyles}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
};

export const HomeIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={positionStyles}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
    </svg>
  );
};

export const GradeIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={positionStyles}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
    </svg>
  );
};

export const AttendanceIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={positionStyles}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M200-80q-33 0-56.5-23.5T120-160v-480q0-33 23.5-56.5T200-720h40v-200h480v200h40q33 0 56.5 23.5T840-640v480q0 33-23.5 56.5T760-80H200Zm120-640h320v-120H320v120ZM200-160h560v-480H200v480Zm280-40q83 0 141.5-58.5T680-400q0-83-58.5-141.5T480-600q-83 0-141.5 58.5T280-400q0 83 58.5 141.5T480-200Zm0-60q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm46-66 28-28-54-54v-92h-40v108l66 66Zm-46-74Z" />
    </svg>
  );
};

export const InfoIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={positionStyles}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm379-235q41-41 41-99t-41-99q-41-41-99-41t-99 41q-41 41-41 99t41 99q41 41 99 41t99-41ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm69-80h422q-44-39-99.5-59.5T480-280q-56 0-112.5 20.5T269-200Zm168.5-337.5Q420-555 420-580t17.5-42.5Q455-640 480-640t42.5 17.5Q540-605 540-580t-17.5 42.5Q505-520 480-520t-42.5-17.5ZM480-503Z" />
    </svg>
  );
};

export const SettingsIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={positionStyles}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
    </svg>
  );
};

export const UserIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={positionStyles}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M370.33-524.33Q326.67-568 326.67-634t43.66-109.67Q414-787.33 480-787.33t109.67 43.66Q633.33-700 633.33-634t-43.66 109.67Q546-480.67 480-480.67t-109.67-43.66ZM160-160v-100q0-36.67 18.5-64.17T226.67-366q65.33-30.33 127.66-45.5 62.34-15.17 125.67-15.17t125.33 15.5q62 15.5 127.34 45.17 30.33 14.33 48.83 41.83T800-260v100H160Zm66.67-66.67h506.66V-260q0-14.33-8.16-27-8.17-12.67-20.5-19-60.67-29.67-114.34-41.83Q536.67-360 480-360t-111 12.17Q314.67-335.67 254.67-306q-12.34 6.33-20.17 19-7.83 12.67-7.83 27v33.33Zm315.16-345.5Q566.67-597 566.67-634t-24.84-61.83Q517-720.67 480-720.67t-61.83 24.84Q393.33-671 393.33-634t24.84 61.83Q443-547.33 480-547.33t61.83-24.84ZM480-634Zm0 407.33Z" />
    </svg>
  );
};

export const PlusIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={positionStyles}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

export const TrashIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={positionStyles}
    >
      <path d="M3 6h18"></path>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    </svg>
  );
};

export const CheckCircle = ({ checked }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
    >
      {checked ? (
        <path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
      ) : (
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z" />
      )}
    </svg>
  );
};

export const ClockIcon = ({ top, bottom, left, right, size, className = "" }) => {
  const positionStyles = {
    position: "relative",
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={positionStyles}
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
};

export const SectionIcon = ({ top, bottom, left, right, size }) => {
  const positionStyles = {
    ...(top && { top: `${top}px` }),
    ...(bottom && { bottom: `${bottom}px` }),
    ...(left && { left: `${left}px` }),
    ...(right && { right: `${right}px` }),
    ...(size && { width: `${size}px`, height: `${size}px` }),
  };
  return <School style={positionStyles} />;
};
