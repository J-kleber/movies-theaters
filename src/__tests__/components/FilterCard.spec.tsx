import React from 'react';

import { fireEvent, render } from 'react-native-testing-library';

import FilterCard from '../../components/FilterCard';

const mockedHandleFilterGender = jest.fn();

describe('FilterCard Component', () => {
  it('should be able to click on a card', () => {
    const { getByTestId } = render(
      <FilterCard
        item={{ id: 1, name: 'action' }}
        filterGender={[]}
        handleFilterGender={mockedHandleFilterGender}
      />,
    );

    const button = getByTestId('filter-card-item');

    fireEvent.press(button);

    expect(mockedHandleFilterGender).toHaveBeenCalled();
  });

  it('should be able to render the card title', () => {
    const { getByTestId } = render(
      <FilterCard
        item={{ id: 1, name: 'action' }}
        filterGender={[]}
        handleFilterGender={mockedHandleFilterGender}
      />,
    );

    const title = getByTestId('title-card-item');

    expect(title.props.children).toEqual('action');
  });
});
