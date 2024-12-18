import toast, { Toaster } from "react-hot-toast";
const SnackBar = () => {
    const notify = () => toast('item deleted');
    return (
        <div>
            <button onClick={notify}>Make me a toast</button>
            <Toaster />
        </div>
    )
}

export default SnackBar;