import Calendar from '../../components/Calendar';
import { PrivateRoute } from '../../components/PrivateRoute';

const CalendarPage = () => <Calendar />;

export default PrivateRoute(CalendarPage);
