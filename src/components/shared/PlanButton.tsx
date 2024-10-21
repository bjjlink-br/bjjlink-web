type PlanButtonProps = {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export const PlanButton = ({ isActive, onClick, children }: PlanButtonProps) => (
    <button
      className={`px-4 py-2 rounded-md flex items-center ${
        isActive ? 'bg-blue-600' : 'text-gray-400'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )