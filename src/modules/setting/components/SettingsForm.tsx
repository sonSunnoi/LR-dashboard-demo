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
import { capitalize } from 'lodash-es'
import { useEffect } from 'react'

import useIsClient from '@/modules/core/hooks/useIsClient'

import useSettings from '../hooks/useSettings'
import { Settings } from '../models'
import { processColor } from '../utils'

const SettingsForm = () => {
    const isClient = useIsClient()
    const [messageApi, contextHolder] = message.useMessage()

    const { settings, setSettings, resetSettings } = useSettings()
    const [form] = Form.useForm<Settings>()

    const handleFinish = (values: Settings) => {
        let processedValues: Settings = {
            ...values,
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

    const colors = ['success', 'warning', 'danger'] as const

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
                    {colors.map((color) => (
                        <Form.Item<Settings>
                            label={`${capitalize(color)} Color`}
                            name={[key, 'color', color]}
                            rules={[{ required: true }]}
                            key={color}
                        >
                            <ColorPicker format="hex" showText />
                        </Form.Item>
                    ))}

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

                    {title === 'Order' && (
                        <Form.Item<Settings>
                            label="Stall Time Threshold"
                            name={[key, 'stallTimeThreshold']}
                            rules={[{ required: true }, { min: 0 }]}
                            validateFirst
                        >
                            <InputNumber addonAfter="Minutes" />
                        </Form.Item>
                    )}
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
