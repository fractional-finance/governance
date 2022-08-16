import gql from "graphql-tag";

export const THREAD_PROPOSAL_QUERY = gql`
  query ThreadProposals {
    threadProposals {
        id
        governor
        name
        symbol
        descriptor
        data
        baseProposal {
          id
          thread {
            id
          }
          frabric {
            id
          }
          creator
          type
          state
          votes {
            id
            voter
            voteDirection
            count
          }
          info
        }
      }
  }
`;

export const ALL_ASSETS_QUERY = gql`
  query Frabric
  {
    frabrics {
      id
      threads {
        id
      }
    }
  }  
`;

export const PARTICIPANTS_PER_DAO = gql`
  query Frabric
  {
    frabrics {
      id
      
      paperProposal {
        id
        address
        type
      }
    }
  }
`;

export const ALL_PROPOSALS = gql`
query ALL_PROPOSALS($id: String!) {
  frabric(id: $id) {
    paperProposals(orderBy: id, orderDirection: desc) {
      id
      baseProposal {
        creator
        endTimestamp
        info
        startTimestamp
        state
        supermajority
        votes {
          id
          voteDirection
          voter
          count
        }
      }
    }
    upgradeProposals(orderBy: id, orderDirection: desc) {
      baseProposal {
        creator
        endTimestamp
        info
        startTimestamp
        state
        supermajority
        votes {
          id
          voteDirection
          voter
          count
        }
      }
      beacon
      code
      data
      id
      instance
      version
    }
    participantProposals(orderBy: id, orderDirection: desc) {
      baseProposal {
        id
        info
        startTimestamp
        endTimestamp
        state
        supermajority
        votes {
          id
          voteDirection
          voter
          count
        }
      }
      participant
      participantType
      proposer
    }
    tokenActionProposals(orderBy: id, orderDirection: desc) {
      amount
      id
      mint
      price
      target
      token
      baseProposal {
        creator
        endTimestamp
        info
        startTimestamp
        state
        supermajority
        type
        votes {
          id
          count
          voteDirection
          voter
        }
      }
    }
  }
}`;
