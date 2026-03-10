import {useStyles} from './Home.styles';

const useViewModel = () => {
  const styles = useStyles();

  return {
    styles,
  };
};

export default useViewModel;
