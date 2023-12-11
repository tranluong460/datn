import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetHotelByCityQuery } from "../../../api";
import {
  Container,
  Filter,
  FilterDialog,
  FilterTop,
  ListHotel,
} from "../../../components";
import { useSearchModal } from "../../../hooks";

const HotelListPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const searchModal = useSearchModal();
  const [showDialog, setShowDialog] = useState(false);
  const [showRate, setShowRate] = useState(true);
  const [locationValue, setLocationValue] = useState(params.get("location"));

  const { data, isFetching } = useGetHotelByCityQuery(locationValue);

  useEffect(() => {
    setLocationValue(params.get("location"));
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (!locationValue) {
      navigate("/");
      searchModal.onOpen();
    }

    // eslint-disable-next-line
  }, [locationValue]);

  return (
    <>
      <Container>
        <FilterDialog
          isShowRate={showRate}
          onShowRate={() => setShowRate(!showRate)}
          isShowDialog={showDialog}
          onShowDialog={() => setShowDialog(!showDialog)}
        />

        <Container>
          <div className="pt-5">
            <FilterTop onShowDialog={() => setShowDialog(!showDialog)} />
          </div>

          <div className="pb-24 pt-3">
            <h2 id="products-heading" className="sr-only">
              Danh sách khách sạn
            </h2>

            <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-4">
              <Filter
                isShowRate={showRate}
                onShowRate={() => setShowRate(!showRate)}
              />

              <div className="lg:col-span-3">
                <ListHotel listHotel={data?.data} isLoading={isFetching} />
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default HotelListPage;
