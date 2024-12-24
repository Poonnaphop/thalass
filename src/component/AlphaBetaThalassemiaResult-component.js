import { useLocation, useNavigate } from "react-router-dom";

function AlphaBetaThalassemiaResultComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;
    console.log("AlphaBetaThalassemiaResultComponent formData:", formData);
    return (
        <></>
    );
}
export default AlphaBetaThalassemiaResultComponent