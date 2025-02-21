import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import Belagavi from "./BelagaviMap";
import Cookies from "js-cookie";

const BelagaviLandingPage = () => {

  const userCookie = Cookies.get("authUser");
  const entityId = userCookie ? JSON.parse(userCookie).entity_id.entity_id : null;

  // Example data for charts
  const lineData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 80 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 100 },
  ];

  const pieData = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 300 },
    { name: "Category D", value: 200 },
  ];

  const barData = [
    { name: "Q1", value: 65 },
    { name: "Q2", value: 80 },
    { name: "Q3", value: 45 },
    { name: "Q4", value: 95 },
  ];

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

  return (
    <>

      <Box style={{ position: "relative", height: "100vh", width: "100%", backgroundColor: "#121212" }}>
        {/* Map Section */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <Belagavi />{/* Map is now a separate component */}
        </Box>

        {/* Floating Graphs Section - Left */}
        <Box
          style={{
            position: "absolute",
            top: 5,
            left: 5,
            zIndex: 1000,
            width: "25%",

          }}
        >
          <Grid container spacing={2}>
            {/* Line Chart */}
            <Grid item xs={10}>
              <Card style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Line Chart
                  </Typography>
                  <LineChart width={200} height={100} data={lineData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <CartesianGrid stroke="#555" />
                    <XAxis dataKey="name" stroke="#FFFFFF" />
                    <YAxis stroke="#FFFFFF" />
                    <Tooltip />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={10}>
              <Card style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quarterly Growth
                  </Typography>
                  <BarChart width={200} height={100} data={barData}>
                    <Bar dataKey="value" fill="#8884d8" />
                    <CartesianGrid stroke="#555" />
                    <XAxis dataKey="name" stroke="#FFFFFF" />
                    <YAxis stroke="#FFFFFF" />
                    <Tooltip />
                  </BarChart>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={10}>
              <Card style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quarterly Growth
                  </Typography>
                  <BarChart width={200} height={100} data={barData}>
                    <Bar dataKey="value" fill="#8884d8" />
                    <CartesianGrid stroke="#555" />
                    <XAxis dataKey="name" stroke="#FFFFFF" />
                    <YAxis stroke="#FFFFFF" />
                    <Tooltip />
                  </BarChart>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Floating Graphs Section - Bottom (Adjusted to start under the left section) */}
        <Box
          style={{
            position: "absolute",
            bottom: 10,
            left: "25%",  // Adjusted to start under the left graphs
            zIndex: 1000,
            width: "75%",
          }}
        >
          <Grid container spacing={2} justifyContent="space-around">
            {/* Second Line Chart */}
            <Grid item xs={4}>
              <Card style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sales Trend
                  </Typography>
                  <LineChart width={200} height={100} data={lineData}>
                    <Line type="monotone" dataKey="value" stroke="#00C49F" />
                    <CartesianGrid stroke="#555" />
                    <XAxis dataKey="name" stroke="#FFFFFF" />
                    <YAxis stroke="#FFFFFF" />
                    <Tooltip />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>

            {/* Second Pie Chart */}
            <Grid item xs={3}>
              <Card style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Revenue Split
                  </Typography>
                  <PieChart width={200} height={100}>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={40}
                      fill="#FF8042"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </CardContent>
              </Card>
            </Grid>

            {/* Second Bar Chart */}
            <Grid item xs={4}>
              <Card style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quarterly Growth
                  </Typography>
                  <BarChart width={200} height={100} data={barData}>
                    <Bar dataKey="value" fill="#8884d8" />
                    <CartesianGrid stroke="#555" />
                    <XAxis dataKey="name" stroke="#FFFFFF" />
                    <YAxis stroke="#FFFFFF" />
                    <Tooltip />
                  </BarChart>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default BelagaviLandingPage;
