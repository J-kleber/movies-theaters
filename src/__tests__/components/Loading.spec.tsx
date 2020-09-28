import React from 'react';

import { render } from 'react-native-testing-library';

import Loading from '../../components/Loading';

describe('Loading Component', () => {
  it('should be able to render an activity indicator', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });
});
