
const Warning = (username) => {
    const userName = "waleed gondal"
  return (
    <>
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box absolute top-24 lg:relative lg:top-0  bg-secondary w-full lg:w-[400px] lg:max-w-[500px] rounded-xl shadow-lg p-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-2xl mb-5 mt-1">{`Are you sure you want to remove ${userName} ?`}</h3>
        </div>
      </dialog>
    </>
  )
}

export default Warning