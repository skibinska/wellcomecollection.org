// @flow
import title from './parts/title';
import promo from './parts/promo';
import timestamp from './parts/timestamp';
import place from './parts/place';
import link from './parts/link';
import list from './parts/list';
import structuredText from './parts/structured-text';
import embed from './parts/embed';
import boolean from './parts/boolean';
import text from './parts/text';
import contributorsWithTitle from './parts/contributorsWithTitle';
import body from './parts/body';

const Events = {
  Event: {
    title,
    format: link('Format', 'document', ['event-formats']),
    place: place,
    series: list('Event series', {
      series: link('Series', 'document', ['event-series']),
    }),
    times: list('Times', {
      startDateTime: timestamp('Start'),
      endDateTime: timestamp('End'),
      isFullyBooked: boolean('Fully booked'),
    }),
    body,
  },
  Access: {
    isRelaxedPerformance: boolean('Relaxed performance'),
    interpretations: list('Interpretations', {
      interpretationType: link('Interpretation', 'document', [
        'interpretation-types',
      ]),
      isPrimary: boolean('Primary interprtation'),
    }),
    audiences: list('Audiences', {
      audience: link('Audience', 'document', ['audiences']),
    }),
  },
  Reservation: {
    ticketSalesStart: timestamp('Ticket sales start'),
    bookingEnquiryTeam: link('Booking enquiry team', 'document', ['teams']),
    eventbriteEvent: embed('Eventbrite event'),
    // This is what it was labelled on the UI,
    // so that's what we're calling it here
    bookingInformation: structuredText('Extra information'),
    policies: list('Policies', {
      policy: link('Policy', 'document', ['event-policies']),
    }),
    hasEarlyRegistration: boolean('Early registration'),
    cost: text('Cost'),
  },
  Schedule: {
    schedule: list('Events', {
      event: link('Event', 'document', ['events']),
      isNotLinked: boolean('Suppress link to event'),
    }),
    backgroundTexture: link('Background texture', 'document', [
      'background-textures',
    ]),
  },
  Contributors: contributorsWithTitle(),
  Promo: {
    promo,
  },
  Metadata: {
    metadataDescription: structuredText('Metadata description', 'single'),
  },
  Deprecated: {
    description: structuredText('Description', 'multi', [
      'heading2',
      'list-item',
    ]),
  },
};

export default Events;
