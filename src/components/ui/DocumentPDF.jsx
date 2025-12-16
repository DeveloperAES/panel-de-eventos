// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet
// } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     width: 226, // 80mm
//     padding: 10,
//     fontSize: 10,
//     fontFamily: "Courier",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 14,
//     marginBottom: 8,
//     fontWeight: "bold",
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 4,
//   },
//   label: {
//     width: "40%",
//     fontWeight: "bold",
//   },
//   value: {
//     width: "60%",
//     textAlign: "right",
//   },
// });

// export default function TicketPDF({ usuario }) {
//   return (
//     <Document>
//       <Page size={[226, 600]} style={styles.page}>
//         <Text style={styles.title}>TICKET DE INGRESO</Text>

//         <View style={styles.row}>
//           <Text style={styles.label}>Nombres:</Text>
//           <Text style={styles.value}>{usuario.nombres}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Apellidos:</Text>
//           <Text style={styles.value}>{usuario.apellidos}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Correo:</Text>
//           <Text style={styles.value}>{usuario.correo_corporativo}</Text>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.label}>Empresa:</Text>
//           <Text style={styles.value}>{usuario.empresa}</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// }
