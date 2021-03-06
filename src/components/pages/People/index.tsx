import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import styled from 'styled-components';
import Layout from '../../../_layout';
import { RootState } from '../../../redux';
import * as peopleActions from '../../../redux/modules/people/action';
import PageHeader from '../../shared/PageHeader';
import Loading from '../../shared/Loading';
import { CenterDiv, PersonContainer } from '../../shared/Containers/Containers';
import PersonCard from '../../shared/Containers/PersonCard';
import { Person } from '../../../../types/People';

const PersonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 15px;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1240px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

interface NextCardProps {
  listLength: number;
  isBusy?: boolean;
}

const NextPageCard: React.FC<NextCardProps> = ({ listLength, isBusy = false }) => {
  const dispatch = useDispatch();

  const onClick = (e: React.MouseEvent): void => {
    const nextPage = listLength / 10 + 1;
    e.preventDefault();
    e.stopPropagation();
    dispatch(peopleActions.getPeopleList(nextPage));
  };

  return (
    <PersonContainer onClick={isBusy ? () => {} : onClick}>
      <CenterDiv className="next-page-card-body">
        {isBusy ? <Loading /> : <h1>Next Page</h1>}
      </CenterDiv>
    </PersonContainer>
  );
};

interface Props {
  isBusy: boolean;
  peopleList: Person[];
}

const PeoplePage: React.FC<Props> = ({ peopleList, isBusy }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(peopleActions.getPeopleList());
  }, [dispatch]);

  return (
    <Layout isBusy={isBusy && peopleList.length === 0}>
      <React.Fragment>
        <PageHeader title={'People'} />
        <PersonGrid>
          {peopleList.map((person: Person) => (
            <PersonCard person={person} key={person.id} />
          ))}
          <NextPageCard isBusy={isBusy} listLength={peopleList.length} />
        </PersonGrid>
      </React.Fragment>
    </Layout>
  );
};

const mapStateToProps = ({ people }: RootState) => ({
  peopleList: people.peopleList,
  isBusy: people.isBusy,
});

const enhance = connect(mapStateToProps);

export default enhance(PeoplePage);
