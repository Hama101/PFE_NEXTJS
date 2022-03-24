import { useRouter } from 'next/router'
//styles for this component
import styles from './Btn.module.css';

const FloatingButton = () => {
    const router = useRouter();
    return (
        <button className={styles.float}
            onClick={() => {
                //navigate to /recipes
                router.push('/recipes/create')
            }}
        >
            <i className="styles.my_float"><h4>+</h4></i>
        </button>
    );
}

export default FloatingButton;
