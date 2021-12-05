import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useSnackbar} from "notistack";

const AlertNotification = () => {
    const {error} = useSelector((state) => state.error);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (error && error.message) {
            enqueueSnackbar(error.message, {variant: "error"});
        }
    }, [error]);

    return null;
};

export default AlertNotification;
