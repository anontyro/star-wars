import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Person } from '../../../redux/modules/people/reducer';
import { RootState } from '../../../redux';
import * as peopleActions from '../../../redux/modules/people/action';
import Layout from '../../../_layout';

interface Props {
  peopleList: Person[];
  isBusy: boolean;
}

const HomePage: React.FC<Props> = ({ peopleList, isBusy }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(peopleActions.getPeopleList());
  }, [dispatch]);

  return (
    <Layout isBusy={isBusy}>
      <h1>Home</h1>
    </Layout>
  );
};

const mapStateToProps = ({ people }: RootState) => ({
  peopleList: people.peopleList,
  isBusy: people.isBusy,
});

const enhance = connect(mapStateToProps);

export default enhance(HomePage);
