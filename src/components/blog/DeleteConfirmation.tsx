import React from 'react';
import Button from '../ui/Button';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onConfirm,
  onCancel,
  title,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Delete Confirmation</h2>
        <p className="text-slate-600 mb-6">
          Are you sure you want to delete <span className="font-medium">"{title}"</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;