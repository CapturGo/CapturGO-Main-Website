import { useEffect } from 'react';

export default function Waitlist() {
  useEffect(() => {
    window.location.href = '/waitlist/page.html';
  }, []);

  return null;
}
