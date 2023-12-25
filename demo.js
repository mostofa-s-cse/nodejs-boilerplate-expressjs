db.user = require("./user/users.model.js")(
  db.sequelize,
  DataTypes,
  db.Sequelize
);
db.admin = require("./admin/admin.model.js")(db.sequelize, DataTypes);

/* --------------  End --------------- */

/*----------------- Hotel and Scheams ---------------*/

// intialize hotel_categories
db.HotelCategory = require("./properties/hotel/hotel_category/category.model")(
  db.sequelize,
  DataTypes
);

// intialize hotels
db.Hotel = require("./properties/hotel/hotel.model")(db.sequelize, DataTypes);

// intialize hotel_details
db.HotelDetails = require("./properties/hotel/hotel_details/details.model")(
  db.sequelize,
  DataTypes
);

// intialize hotel_images
db.HotelImages = require("./properties/hotel/hotel_images/hotel_images.model")(
  db.sequelize,
  DataTypes
);

// intialize facilities_type
db.FacilitiesType =
  require("./properties/hotel/facilities/facilities_type/facilties_type.model")(
    db.sequelize,
    DataTypes
  );

// intialize facilities
db.Facilities = require("./properties/hotel/facilities/facilities.model")(
  db.sequelize,
  DataTypes
);

// intialize hotel facilities
db.HotelFacilities =
  require("./properties/hotel/hotel_facilities/hotel_facilities.model")(
    db.sequelize,
    DataTypes
  );

// intialize hotel policies
db.HotelPolicies =
  require("./properties/hotel/hotel_policies/hotel_policies.model")(
    db.sequelize,
    DataTypes
  );

db.HotelReviews = require("./properties/hotel/hotel_reviews/review.model")(
  db.sequelize,
  DataTypes
);

// category-hotel
db.HotelCategory.hasOne(db.Hotel, { foreignKey: "category_id" });
db.Hotel.belongsTo(db.HotelCategory, { foreignKey: "category_id" });

// reviews;
db.Hotel.hasMany(db.HotelReviews, { foreignKey: "hotel_id" });
db.HotelReviews.belongsTo(db.Hotel, { foreignKey: "hotel_id" });

// user to reviews
db.user.hasMany(db.HotelReviews, { foreignKey: "user_id" });
db.HotelReviews.belongsTo(db.user, { foreignKey: "user_id" });

// hotel-hotel_details
db.Hotel.hasOne(db.HotelDetails, { foreignKey: "hotel_id" });
db.HotelDetails.belongsTo(db.Hotel, { foreignKey: "hotel_id" });

// hotel-hotel_images
db.Hotel.hasMany(db.HotelImages, { foreignKey: "hotel_id" });
db.HotelImages.belongsTo(db.Hotel, { foreignKey: "hotel_id" });

// hotel-hotel_policies
db.Hotel.hasOne(db.HotelPolicies, { foreignKey: "hotel_id" });
db.HotelPolicies.belongsTo(db.Hotel, { foreignKey: "hotel_id" });

// facilities_type-facilities
db.FacilitiesType.hasOne(db.Facilities, { foreignKey: "type_id" });
db.Facilities.belongsTo(db.FacilitiesType, {
  foreignKey: "type_id",
});

// hotel facilities
db.Hotel.belongsToMany(db.Facilities, {
  through: db.HotelFacilities,
  foreignKey: "hotel_id",
});
db.Facilities.belongsToMany(db.Hotel, {
  through: db.HotelFacilities,
  foreignKey: "facilities_id",
});

db.RoomFaciType =
  require("./properties/rooms/facilities/faci_type/faci_type.model")(
    db.sequelize,
    DataTypes
  );

// facility list
db.R_FacilityList = require("./properties/rooms/facilities/facilities.model")(
  db.sequelize,
  DataTypes
);

// intialize room type
db.RoomTypes = require("./properties/rooms/room_type/type.model")(
  db.sequelize,
  DataTypes
);

// intialize rooms
db.Rooms = require("./properties/rooms/rooms.model")(db.sequelize, DataTypes);

// intialize room details
db.RoomDetails = require("./properties/rooms/room_details/details.model")(
  db.sequelize,
  DataTypes
);

// intialize room images
db.RoomImages = require("./properties/rooms/room_images/room_images.model")(
  db.sequelize,
  DataTypes
);

// room_facilities
db.RoomFacilities =
  require("./properties/rooms/room_facilities/room_facilities.model")(
    db.sequelize,
    DataTypes
  );

/*--------- END ------*/

/*------------ Association -------------*/
// hotel_rooms
db.Hotel.hasMany(db.Rooms, { foreignKey: "hotel_id" });
db.Rooms.belongsTo(db.Hotel, { foreignKey: "hotel_id" });

// room_type to room
db.RoomTypes.hasOne(db.Rooms, { foreignKey: "room_type_id" });
db.Rooms.belongsTo(db.RoomTypes, { foreignKey: "room_type_id" });

// room to details
db.Rooms.hasOne(db.RoomDetails, { foreignKey: "room_id" });
db.RoomDetails.belongsTo(db.RoomDetails, { foreignKey: "room_id" });

// room to images
db.Rooms.hasMany(db.RoomImages, { foreignKey: "room_id" });
db.RoomImages.belongsTo(db.Rooms, { foreignKey: "room_id" });

// facilities_type to facilities
db.RoomFaciType.hasOne(db.R_FacilityList, { foreignKey: "facilities_type_id" });
db.R_FacilityList.belongsTo(db.RoomFaciType, {
  foreignKey: "facilities_type_id",
});

// many rooms to many facilities
db.Rooms.belongsToMany(db.R_FacilityList, {
  through: db.RoomFacilities,
  foreignKey: "room_id",
});
db.R_FacilityList.belongsToMany(db.Rooms, {
  through: db.RoomFacilities,
  foreignKey: "facilities_id",
});

/*--------- END ------*/

/*------------- Booking ans Schemas -------------*/
db.HotelBooking = require("./hotel_booking/hotel_booking.model")(
  db.sequelize,
  DataTypes
);

db.HotelBookingDetails =
  require("./hotel_booking/booking_details/booking_details.model")(
    db.sequelize,
    DataTypes
  );

db.HotelBookingPayment =
  require("./hotel_booking/booking_payment/booking_payment.model")(
    db.sequelize,
    DataTypes
  );
/*--------- END ------*/

/*------------- Associations -------------*/

// user tp hotel_booking
db.user.hasMany(db.HotelBooking, { foreignKey: "user_id" });
db.HotelBooking.belongsTo(db.user, { foreignKey: "user_id" });

// hotel_booking tp hotel_booking_details
db.HotelBooking.hasMany(db.HotelBookingDetails, { foreignKey: "booking_id" });
db.HotelBookingDetails.hasMany(db.HotelBooking, { foreignKey: "booking_id" });

// hotel tp hotel_booking_details
db.Hotel.hasMany(db.HotelBookingDetails, { foreignKey: "hotel_id" });
db.HotelBookingDetails.belongsTo(db.Hotel, { foreignKey: "hotel_id" });

// room tp hotel_booking_details
db.Rooms.hasMany(db.HotelBookingDetails, { foreignKey: "room_id" });
db.HotelBookingDetails.belongsTo(db.Rooms, { foreignKey: "room_id" });

// hotel_booking to payments
db.HotelBooking.hasOne(db.HotelBookingPayment, { foreignKey: "booking_id" });
db.HotelBookingPayment.hasOne(db.HotelBooking, { foreignKey: "booking_id" });
