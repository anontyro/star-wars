import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Person } from '../../../redux/modules/people/reducer';
import { RootState } from '../../../redux';
import * as peopleActions from '../../../redux/modules/people/action';

interface Props {
  peopleList: Person[];
}

const HomePage: React.FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(peopleActions.getPeopleList());
  }, [dispatch]);

  return (
    <React.Fragment>
      <h1>Home</h1>
    </React.Fragment>
  );
};

const mapStateToProps = ({ people }: RootState) => ({
  peopleList: people.peopleList,
});

const enhance = connect(mapStateToProps);

export default enhance(HomePage);
