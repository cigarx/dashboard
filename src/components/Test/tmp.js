/*
<div className={styles.overview}>
<Row>
<Tooltip title="以行业维度显示报活数据">
  <span className={styles.labelNote}>选择行业</span>
</Tooltip>
<Select defaultValue={byType} value={byType} className={styles.select} onChange={onOptionChange}>
  <Option key="all">
    全部行业
  </Option>
  {typechildren}
</Select>
<Tooltip title="以行业维度显示报活数据">
  <span className={styles.labelNote}>月份调整</span>
</Tooltip>
<MonthPicker value={byDate} format="yyyy-MM" onChange={onStartChange}/>
</Row>
<Row gutter={16} className={styles.chartdiv}>
<Col span={15}>
  <CardGroup />
  <Row>
    <section className={styles.cardBox}>
      <LineChart title={title} lineData = {LineData}/>
    </section>
  </Row>
</Col>
<Col span={9}>
  <Row gutter={16}>
    <Col span={12} >
      <section className={styles.cardBox}>
        <DemoCharts chartData={InstallByIndustry} title={"安装量统计"} name={"安装量"}/>
      </section>
    </Col>
    <Col span={12}>
      <section className={styles.cardBox}>
        <DemoCharts chartData={BuyByIndustry} title={"采购量统计"} name={"采购量"}/>
      </section>
    </Col>
  </Row>
  <Row>
    <section className={styles.cardBox}>
      <MapChart mapData={mapdata} className={styles.map}/>
    </section>
  </Row>
</Col>
<Col span={4}>
<Row gutter={16}>
  <Collapse defaultActiveKey={['1']}>
    <Panel header="企业报活数 Top 10" key="1">
      <Table columns={columns} dataSource={data} size="small" pagination={false}/>
    </Panel>
    <Panel header="临近服务期企业报活数 Top 10" key="2">
      <Table columns={columns} dataSource={data} size="small" pagination={false}/>
    </Panel>
    <Panel header="企业安装数 Top 10" key="3">
      <Table columns={columns} dataSource={data} size="small" pagination={false}/>
    </Panel>
  </Collapse>
</Row>
</Col>
</Row>
</div>

*/
