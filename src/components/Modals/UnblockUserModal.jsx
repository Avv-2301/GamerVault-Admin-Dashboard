import Modal from '../ui/Modal'

const UnblockUserModal = ({ isOpen, onClose, user, onConfirm }) => {
  const handleUnblock = () => {
    onConfirm()
    onClose()
  }

  if (!user) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Unblock User"
      subtitle="This action will restore the user's account access"
    >
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-[#1e2742] border border-gray-200 dark:border-[#2a3441] rounded-lg p-4">
          <div className="text-gray-800 dark:text-white font-medium mb-1">{user.name?.toUpperCase()}</div>
          <div className="text-gray-600 dark:text-[#8b8fa3] text-sm">{user.email}</div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleUnblock}
            className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
          >
            Confirm Unblock
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white dark:bg-[#141b2d] border border-gray-200 dark:border-[#1e2742] text-gray-700 dark:text-[#e0e0e0] px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e2742] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UnblockUserModal
