import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useSearchRoomMutation } from "../../../api";
import {
  Container,
  Filter,
  FilterDialog,
  FilterTop,
  ListHotel,
} from "../../../components";

const HotelListPage = () => {
  const location = useLocation();
  const params = location.search;
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showRate, setShowRate] = useState(true);
  // const [locationValue, setLocationValue] = useState(params.get("location"));
  // const newUsser = params.get("location");

  const [searchParams] = useSearchParams();

  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const quantity = searchParams.get("quantity") || "";
  const minPrice = searchParams.get("minPrice") || undefined;
  const maxPrice = searchParams.get("maxPrice") || undefined;

  const [search, setSearch] = useSearchRoomMutation();
  const [searchResult, setSearchResult] = useState(null);
  console.log("🚀 ~ HotelListPage ~ searchResult:", searchResult);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await search({
          checkin,
          checkout,
          quantity,
          maxPrice,
          minPrice,
        });
        setSearchResult(response?.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [checkin, checkout, quantity, search, minPrice, maxPrice]);

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
            <h1 id="products-heading" className="sr-only">
              Danh sách phòng
            </h1>

            <div className="grid grid-cols-1 gap-x-5 gap-y-10 lg:grid-cols-4">
              <Filter
                isShowRate={showRate}
                onShowRate={() => setShowRate(!showRate)}
              />

              <div className="lg:col-span-3">
                <ListHotel listHotel={searchResult?.data} />
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default HotelListPage;
