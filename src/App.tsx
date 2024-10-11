import '@coreui/coreui/dist/css/coreui.min.css';
import { cilOptions, cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAlert, CButtonGroup, CContainer, CDropdown, CDropdownDivider, CDropdownMenu, CDropdownToggle, CFormCheck, CSpinner, CWidgetStatsA } from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useShallow } from "zustand/react/shallow";
import './App.css';
import CityForm from './components/CityForm';
import { sizes } from './config';
import useCityStore from './hooks/useCityStore';
import useFetch from './hooks/useFetch';
import useSizeStore from './hooks/useSizeStore';

function App() {
  const { city } = useCityStore(useShallow((state) => ({ city: state.city })));
  const { sizeStyle, selectedSize } = useSizeStore(useShallow((state) => ({ sizeStyle: state.sizeStyle, selectedSize: state.selectedSize })));
  const updateSize = useSizeStore((state) => state.updateSize);
  const { data, loading, error } = useFetch(city);
  const [visibleAlert, setVisibleAlert] = useState<boolean>(false);

  useEffect(() => {
    setVisibleAlert(!!error);
  }, [error]
  )
  const handleSizeChange = (_e: any, size: string) => {
    updateSize(size);
  }
  return (
    <CContainer style={sizeStyle}>
      <CAlert
        color="danger"
        dismissible
        visible={visibleAlert}
        onClose={() => setVisibleAlert(false)}
        className="d-flex align-items-center"
      >
        <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
        <div>{error}</div>
      </CAlert>
      {loading ? <CSpinner size="sm" style={{ width: '10rem', height: '10rem' }} /> :
        <CWidgetStatsA
          style={sizeStyle}
          className="mb-4"
          color="primary"
          value={
            <>
              Weather in {data?.current.city}
              <br />
              {moment(data?.current.time).format("dddd, MMMM D YYYY, HH:mm")}
              <br />
              <span className="fs-6 fw-normal">Temperature: {data?.current.temperature} С°</span>
              <br />
              <span className="fs-6 fw-normal">Humidity: {data?.current.humidity} %</span><br />
              <span className="fs-6 fw-normal">Wind speed: {data?.current.wind} m/sec</span>
            </>
          }
          action={
            <CDropdown alignment="end" autoClose={"outside"}>
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-white" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CityForm />
                <CDropdownDivider />
                <CContainer className="d-flex justify-content-center">Size of widget</CContainer>
                <CButtonGroup className='m-4' role="group" aria-label="Widget size">
                  {Object.keys(sizes).map((size, index) => {
                    return (
                    <CFormCheck
                      type="radio"
                      button={{ color: 'primary', variant: 'outline' }}
                      name="vbtnradio"
                      autoComplete="off"
                      id={`radio-${index}`}
                      key={index}
                      label={size}
                      checked={size === selectedSize}
                      onChange={(e) => handleSizeChange(e, size)}
                    />
                    )
                  })}
                </CButtonGroup>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              customTooltips={false}
              className="mt-3 mx-3"
              style={{ height: selectedSize === 'large' ? '500px' : '200px' }}
              data={{
                labels: data?.advanced.map((el: any) => el.time),
                datasets: selectedSize === "small" ? [
                  {
                    label: "Temperature (C°)",
                    backgroundColor: 'rgba(255,255,255,1)',
                    borderColor: 'rgba(255,255,255,1)',
                    data: data?.advanced.map((el: any) => el.temperature),
                    barPercentage: 1,
                  },
                  {
                    label: "Wind (m/s)",
                    backgroundColor: 'rgba(255,0,255,.2)',
                    borderColor: 'rgba(255,0,255,.55)',
                    data: data?.advanced.map((el: any) => el.wind),
                    barPercentage: 1,
                  },
                ] : selectedSize === "wide" ? [
                  {
                    label: "Temperature (C°)",
                    backgroundColor: 'rgba(255,255,255,1)',
                    borderColor: 'rgba(255,255,255,1)',
                    data: data?.advanced.map((el: any) => el.temperature),
                    barPercentage: 1,
                  },
                   {
                    label: "Wind (m/s)",
                    backgroundColor: 'rgba(255,0,255,.2)',
                    borderColor: 'rgba(255,0,255,.55)',
                    data: data?.advanced.map((el: any) => el.wind),
                    barPercentage: 1,
                  },
                  {
                    label: "Humidity %",
                    backgroundColor: 'rgba(255,0,255,.2)',
                    borderColor: 'rgba(255,255,2,.55)',
                    data: data?.advanced.map((el: any) => el.humidity),
                    barPercentage: 1,
                  },
                ] : [
                  {
                    label: "Temperature (C°)",
                    backgroundColor: 'rgba(255,255,255,1)',
                    borderColor: 'rgba(255,255,255,1)',
                    data: data?.advanced.map((el: any) => el.temperature),
                    barPercentage: 1,
                  },
                  {
                    label: "Feels like (C°)",
                    backgroundColor: 'rgba(255,0,255,1)',
                    borderColor: 'rgba(2,255,255,1)',
                    data: data?.advanced.map((el: any) => el.feels_like),
                    barPercentage: 1,
                  },
                  {
                    label: "Wind (m/s)",
                    backgroundColor: 'rgba(255,0,255,.2)',
                    borderColor: 'rgba(255,0,255,.55)',
                    data: data?.advanced.map((el: any) => el.wind),
                    barPercentage: 1,
                  },
                  {
                    label: "Humidity %",
                    backgroundColor: 'rgba(255,0,255,.2)',
                    borderColor: 'rgba(255,255,2,.55)',
                    data: data?.advanced.map((el: any) => el.humidity),
                    barPercentage: 1,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: 'rgba(255,255,255,.75)',
                    }
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />}
    </CContainer>
  )
}

export default App
