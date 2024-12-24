function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="w-[640px] flex flex-col gap-5 p-10 -text--color-grey-700">
      <h3 className="text-3xl" as="h3">Delete the {resourceName}</h3>
      <p className="-text--color-grey-500 mb-7">
        Are you sure you want to delete this {resourceName} permanently? <br />This
        action cannot be undone.
      </p>

      <div className="flex gap-2 justify-end text-lg">
        <button
          className={`flex items-center gap-1 px-5 py-2 rounded-lg -bg--color-grey-100 ${disabled ? 'opacity-50' : 'hover:-bg--color-grey-200'} transitionOptimized`}
          disabled={disabled}
          onClick={onCloseModal}>
          Cancel
        </button>
        <button
          className={`flex  items-center gap-1 -bg--color-red-700 px-5 py-2 rounded-lg text-white ${disabled ? 'opacity-50' : 'hover:-bg--color-red-800'} transitionOptimized`}
          onClick={onConfirm}
          disabled={disabled}>
          {disabled ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
