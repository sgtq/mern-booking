export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone #",
    width: 100,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithAdmin ${params.row.isAdmin ? 'active' : ''}`}>
          {params.row.isAdmin ? 'Admin' : ''}
        </div>
      );
    },
  },
];

export const hotelColumns = [
	{ field: "_id", headerName: "ID", width: 230 },
	{
	  field: "name",
	  headerName: "Hotel",
	  width: 200,
	},
	{
	  field: "type",
	  headerName: "Type",
	  width: 100,
	},
	{
	  field: "title",
	  headerName: "Title",
	  width: 230,
	},
	{
	  field: "city",
	  headerName: "City",
	  width: 100,
	},
  ];

  export const roomColumns = [
	{ field: "_id", headerName: "ID", width: 70 },
	{
	  field: "title",
	  headerName: "Title",
	  width: 230,
	},
	{
	  field: "description",
	  headerName: "Description",
	  width: 100,
	},
	{
	  field: "price",
	  headerName: "Price",
	  width: 100,
	},
	{
	  field: "maxPeople",
	  headerName: "Pax",
	  width: 100,
	},
  ];
	