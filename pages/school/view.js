import Social from '../../components/Social';
import { PrivateRoute } from '../../components/PrivateRoute';

const SocialPage = () => <Social />;

export default PrivateRoute(SocialPage);
