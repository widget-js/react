import { AppApi } from '@widget-js/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import semver from 'semver/preload'

export interface UseAppVersionReturn {
  version: string
  isGreaterOrEqual: (targetVersion: string) => Promise<boolean>
  isLessThan: (targetVersion: string) => Promise<boolean>
}

export function useAppVersion(): UseAppVersionReturn {
  const [version, setVersion] = useState('')
  const versionRef = useRef('')

  useEffect(() => {
    AppApi.getVersion('app').then((result) => {
      if (versionRef.current !== result) {
        versionRef.current = result
        setVersion(result)
      }
    })
  }, [])

  const isGreaterOrEqual = useCallback(async (targetVersion: string): Promise<boolean> => {
    if (versionRef.current === '') {
      const v = await AppApi.getVersion('app')
      versionRef.current = v
      setVersion(v)
    }
    return Promise.resolve(semver.gte(versionRef.current, targetVersion))
  }, [])

  const isLessThan = useCallback(async (targetVersion: string): Promise<boolean> => {
    if (versionRef.current === '') {
      const v = await AppApi.getVersion('app')
      versionRef.current = v
      setVersion(v)
    }
    return Promise.resolve(semver.lt(versionRef.current, targetVersion))
  }, [])

  return { version, isGreaterOrEqual, isLessThan }
}
