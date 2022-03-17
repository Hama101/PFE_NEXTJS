
import { BallTriangle } from 'react-loader-spinner'

const MyLoader = () => {
    return (
        <div className="d-flex justify-content-center algin-items-center mt-5">
            <BallTriangle color="#00BFFF" height={80} width={80} />
        </div>
    );
}

export default MyLoader;
