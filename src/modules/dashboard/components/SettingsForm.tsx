'use client'
import {
    Button,
    ColorPicker,
    Form,
    InputNumber,
    Skeleton,
    Space,
    message,
} from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect } from 'react'

import useIsClient from '../hooks/useIsClient'
import useSettings from '../hooks/useSettings'
import { Settings } from '../models/settings'
import { processColor } from '../utils'

const SettingsForm = () => {
    const isClient = useIsClient()
    const [messageApi, contextHolder] = message.useMessage()

    const { settings, setSettings, resetSettings } = useSettings()
    const [form] = Form.useForm<Settings>()

    const handleFinish = (values: Settings) => {
        let processedValues: Settings = {
            order: {
                ...values.order,
                color: processColor(values.order.color),
            },
            gate: {
                ...values.gate,
                color: processColor(values.gate.color),
            },
        }

        setSettings(processedValues)

        messageApi.success('Settings saved successfully!')
    }

    const handleReset = () => {
        resetSettings()

        messageApi.success('Settings reset successfully!')
    }

    useEffect(() => {
        if (settings) form.setFieldsValue(settings)
    }, [form, settings])

    const sections = [
        { title: 'Order', key: 'order' },
        { title: 'Gate', key: 'gate' },
    ] as const

    return isClient ? (
        <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            className="max-w-[600px]"
            initialValues={settings}
            onFinish={handleFinish}
            onReset={handleReset}
            autoComplete="off"
        >
            {contextHolder}
            {sections.map(({ title, key }) => (
                <>
                    <Title level={3}>{title}</Title>
                    <Form.Item<Settings>
                        label="Success Color"
                        name={[key, 'color', 'success']}
                        rules={[{ required: true }]}
                    >
                        <ColorPicker format="hex" showText />
                    </Form.Item>

                    <Form.Item<Settings>
                        label="Warning Color"
                        name={[key, 'color', 'warning']}
                        rules={[{ required: true }]}
                    >
                        <ColorPicker format="hex" showText />
                    </Form.Item>

                    <Form.Item<Settings>
                        label="Danger Color"
                        name={[key, 'color', 'danger']}
                        rules={[{ required: true }]}
                    >
                        <ColorPicker format="hex" showText />
                    </Form.Item>

                    <Form.Item<Settings>
                        label="Warning Time Threshold"
                        name={[key, 'time', 'warning']}
                        rules={[
                            { required: true },
                            {
                                validator: async (_, value) => {
                                    const dangerTime = form.getFieldValue([
                                        key,
                                        'time',
                                        'danger',
                                    ]) as number

                                    if (value >= dangerTime) {
                                        throw new Error(
                                            'Warning time must be lesser than the danger time',
                                        )
                                    }
                                },
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                        validateFirst
                    >
                        <InputNumber addonAfter="Minutes" />
                    </Form.Item>

                    <Form.Item<Settings>
                        label="Danger Time Threshold"
                        name={[key, 'time', 'danger']}
                        rules={[
                            { required: true },
                            {
                                validator: async (_, value) => {
                                    const warningTime = form.getFieldValue([
                                        key,
                                        'time',
                                        'warning',
                                    ]) as number

                                    if (value <= warningTime) {
                                        throw new Error(
                                            'Danger time must be greater than the warning time',
                                        )
                                    }
                                },
                            },
                        ]}
                        validateTrigger={['onBlur', 'onChange']}
                        validateFirst
                    >
                        <InputNumber addonAfter="Minutes" />
                    </Form.Item>
                </>
            ))}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button type="default" htmlType="reset">
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    ) : (
        <Skeleton />
    )
}

export default SettingsForm
