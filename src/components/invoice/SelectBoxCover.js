export function SelectBoxCover(){
    const [select, setSelect] = useState({
        name: "",
        category: ""
      });
    
      const handleChange = (e) => {
        console.log(e);
      };
    
      //const [data, setData] = useState([]);
      /* get data */
    
      const data = [
        { id: 1, Name: "A" },
        { id: 2, Name: "B" }
      ];
      //console.log(data);
      const categories = data.map((item) => ({ value: item.id, label: item.Name }));
      return (
        // <Routes>
        //   <Route path="/home" element={<Home />}></Route>
        //   <Route path="/dashboard" element={<Dashboard />}>
        //     <Route
        //       path="/dashboard/prescription"
        //       element={<PrescriptionList />}
        //     ></Route>
        //     <Route path="/dashboard/create-invoice" element={<CreateInvoice/>}>
        //     </Route>
        //   </Route>
        // </Routes>
        <SelectBox
                  options={categories}
                  name={"select1"}
                  onChange={handleChange}
                />
      );
}