import { mount as dashboardMount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

const DashboardApp = function DashboardVueComponent() {
  const ref = useRef(null);

  useEffect(() => {
    dashboardMount(ref.current);
  }, []);

  return (
    <div ref={ref} />
  );
};

export default DashboardApp;
