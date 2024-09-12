import { Link } from 'expo-router';
import { styles } from './styles';
import { ICustomLink } from './types';

export default function CustomLink({ title, ...rest }: ICustomLink) {
  return (
    <Link style={styles.container} {...rest}>
      {title}
    </Link>
  );
};