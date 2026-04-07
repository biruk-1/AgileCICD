import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../pages/About';
import Contact from '../pages/Contact';

describe('About page', () => {
  it('renders the page title', () => {
    render(<MemoryRouter><About /></MemoryRouter>);
    expect(screen.getByText('About This Project')).toBeInTheDocument();
  });

  it('displays CI/CD explanation sections', () => {
    render(<MemoryRouter><About /></MemoryRouter>);
    // Multiple elements contain these strings — assert at least one exists
    expect(screen.getAllByText(/Continuous Integration/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Continuous Delivery/i).length).toBeGreaterThan(0);
  });
});

describe('Contact page', () => {
  it('renders the contact form', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('submit button is disabled when fields are empty', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>);
    const btn = screen.getByRole('button', { name: /send message/i });
    expect(btn).toBeDisabled();
  });
});
