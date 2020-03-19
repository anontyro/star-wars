import React, { useEffect } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { compose } from 'redux';
import { RootState } from '../../../redux';
import { Person } from '../../../redux/modules/people/reducer';
import * as peopleActions from '../../../redux/modules/people/action';
import Layout from '../../../_layout';
import PageHeader from '../../shared/PageHeader';

const PersonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  isBusy: boolean;
  person: Person;
}

const PersonPage: React.FC<Props> = ({ person, isBusy, match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = match.params;
    if (`${person?.id}` !== id) {
      dispatch(peopleActions.getPerson(id));
    }
  }, [match.params]);

  return (
    <Layout isBusy={isBusy && !person?.name}>
      <React.Fragment>
        <PageHeader previousPage={{ title: 'People', to: '/people' }} title={person?.name} />
        <PersonContainer></PersonContainer>
      </React.Fragment>
    </Layout>
  );
};

const mapStateToProps = ({ people }: RootState) => ({
  isBusy: people.isBusy,
  person: people.currentPerson,
});

const enhance = compose(withRouter, connect(mapStateToProps));

export default enhance(PersonPage);
