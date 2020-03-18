import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import styled from 'styled-components';
import Layout from '../../../_layout';
import { RootState } from '../../../redux';
import { Person } from '../../../redux/modules/people/reducer';

interface PersonProps {
  person: Person;
}

const PersonContainer = () => {};

interface Props {
  isBusy: boolean;
}

const PeoplePage: React.FC<Props> = ({ isBusy }) => {
  const dispatch = useDispatch();

  return (
    <Layout isBusy={isBusy}>
      <h1>People</h1>
    </Layout>
  );
};

const mapStateToProps = ({ people }: RootState) => ({
  peopleList: people.peopleList,
  isBusy: people.isBusy,
});

const enhance = connect(mapStateToProps);

export default enhance(PeoplePage);
