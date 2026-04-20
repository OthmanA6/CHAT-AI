import { useSelector } from "react-redux";

// Custom hook to retrieve sidebar toggle state from Redux store
const useSidebarToggle = () => {
    const themeSidebarToggle = useSelector((state) => state.theme.themeSidebarToggle);

    return themeSidebarToggle;
};

export default useSidebarToggle;
